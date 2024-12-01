import db from "@/shared/providers/dbProvider";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PATCH(request: Request){
    try{
        const body = await request.json();
        const {id, userName, email, password, role} = body.data;

        //case: user doesn't fill in ID
        if (!id){
            return NextResponse.json({
                error: "User ID is required",
                status: 400,
            });
        }

        //case: there is no data to update
        if (!userName && !email && !password && !role){
            return NextResponse.json({
                error: "No accounts to update",
                status: 400,
            });
        }

        //comfirm whether the account exits or not
        const exitUser = await db.user.findUnique({
            where: {
                id: id,
            },
        });

        //case: not exist the user
        if (!exitUser){
            return NextResponse.json({
                error: "User not found",
                status:404,
            });
        }

        //prepare for updating
        const updateData: any = {};
        if (userName) updateData.userName = userName;
        if (email){
            //comfirm the new email is used already or not
            const emailExits = await db.user.findUnique({
                where: {email: email},
            });
            //case: new email is already used
            if (emailExits && emailExits.id !== id){
                return NextResponse.json({
                    error: "Email already in use",
                    status: 400,
                });
            }
            updateData.email = email;
        }
        if (password){
            updateData.password = await bcrypt.hash(password,10);
        }
        if (role){
            updateData.role = role;
        }

        //update user information
        const updatedUser = await db.user.update({
            where: {id: id},
            data: updateData,
        });

        return NextResponse.json({
            data: updatedUser,
            message: "User's information updated successfully",
            status: 200,
        });
    }catch (error){
        return NextResponse.json({
            message: "Sorry, something went wrong",
            status: 500,
        });
    }
}