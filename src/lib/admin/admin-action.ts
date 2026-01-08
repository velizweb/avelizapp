"use server"

import { db } from "@/db"
import { Product } from "../../../types"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const approvedProductAction = async (productId: Product["id"]) => {
    try {
        await db
            .update(products)
            .set({ status: "APPROVED", approvedAt: new Date() })
            .where(eq(products.id, productId));

        revalidatePath("/admin");

        return{
            success: true,
            message: "Product approved successfully",
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to approve product"
        }
    }
}

export const rejectProductAction = async (productId: Product["id"]) => {
 try {
        await db
            .update(products)
            .set({ status: "REJECTED" })
            .where(eq(products.id, productId));

        revalidatePath("/admin");
        
        return{
            success: true,
            message: "Product rejected successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to reject product"
        }
    }
}