"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import { FormState } from "../../../types";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";


export const addProductAction = async (prevState: FormState, formData: FormData) => {

    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to submit a product",
                errors: undefined
            }
        }

        /*
         la variable orgId que viene del auth es para saber si el usuario pertenece una organizacion   
         y se agregaria en el registro de datos tambien que se encuentra vacio por el momento
        if(!orgId){
            return {
                success: false,
                message: "You must be a member of an organization to submit a product"
            }
        }*/

        const user = await currentUser();
        const emailUser = user?.primaryEmailAddress?.emailAddress || "anonymous";

        const rawformData = Object.fromEntries(formData.entries());

        const validateData = productSchema.safeParse(rawformData);

        if (!validateData.success) {
            return {
                success: false,
                errors: validateData.error.flatten().fieldErrors,
                message: "Invalid data"
            }
        }

        const { data } = validateData;

        const tagsArray = data.tags ? data.tags.filter(tag => typeof tag === "string") : [];

        await db.insert(products).values({
            name: data.name,
            slug: data.slug,
            tagline: data.tagline,
            description: data.description,
            websiteUrl: data.website,
            tags: tagsArray,
            status: "PENDING",
            votecount: 0,
            submittedBy: emailUser,
            organizationId: "",
            userId
        });

        return {
            success: true,
            message: "Product submitted successfully",
            errors: undefined
        }

    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Validation failed. Please check the form",
            }
        }

        return {
            success: false,
            errors: undefined,
            message: "Failed to submit Product"
        }
    }

}

export const upVoteProduct = async (productId: number) => {

    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to submit a product",
                errors: undefined
            }
        }

        /*
         la variable orgId que viene del auth es para saber si el usuario pertenece una organizacion   
         y se agregaria en el registro de datos tambien que se encuentra vacio por el momento
        if(!orgId){
            return {
                success: false,
                message: "You must be a member of an organization to submit a product"
            }
        }*/

        await db.update(products).set({
            votecount: sql`GREATEST(0, vote_count + 1)`,
        }).where(eq(products.id, productId));

        revalidatePath("/")

        return {
            success: true,
            message: "Product upvote successfully",
            errors: undefined
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Invalid data",
            voteCount: 0,
            errors: undefined
        }
    }
}

export const downVoteProduct = async (productId: number) => {

    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "You must be signed in to submit a product",
                errors: undefined
            }
        }

        /*
         la variable orgId que viene del auth es para saber si el usuario pertenece una organizacion   
         y se agregaria en el registro de datos tambien que se encuentra vacio por el momento
        if(!orgId){
            return {
                success: false,
                message: "You must be a member of an organization to submit a product"
            }
        }*/

        await db.update(products).set({
            votecount: sql`GREATEST(0, vote_count - 1)`,
        }).where(eq(products.id, productId));

        revalidatePath("/")

        return {
            success: true,
            message: "Product downvote successfully",
            errors: undefined
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Invalid data",
            voteCount: 0,
            errors: undefined
        }
    }
}
