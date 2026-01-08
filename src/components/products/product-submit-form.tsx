"use client"
import FormField from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { addProductAction } from "@/lib/products.ts/product-actions";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useActionState } from "react";
import { FormState } from "../../../types";
import { cn } from "@/lib/utils";

const  initialState: FormState = {
    success: false,
    errors: undefined,
    message: "",
}

export default function ProductSubmitForm() {

    const [state, formAction, isPending] = useActionState(addProductAction, initialState);

    const { errors, message, success } = state;

    const getfieldErrors = (fieldName: string): string[] => {
        if(!errors) return [];
        return (errors as Record<string, string[]>)[fieldName] ?? [];
    }

    return <form className="space-y-6" action={formAction}>
        {
            message && (
                <div className={cn("p-4 rounded-lg border",
                    success
                        ? "bg-violet-300 border-violet-400 text-primary"
                        : "bg-red-300 border-red-400 text-red-600"
                )}
                    role="alert"
                    aria-live="polite"
                >
                    {message}
                </div>
            )
        }
        <FormField
            id="name"
            label="Product name"
            name="name"
            placeholder="My name product"
            required
            onChange={() => { }}
            error={getfieldErrors("name")}
        />

        <FormField
            id="slug"
            label="Slug"
            name="slug"
            placeholder="My slug product"
            required
            onChange={() => { }}
            error={getfieldErrors("slug")}
            helperText="URL-friend version of your product name"
        />

        <FormField
            id="tagline"
            label="Tagline"
            name="tagline"
            placeholder="My tagline product"
            required
            onChange={() => { }}
            error={getfieldErrors("tagline")}
        />


        <FormField
            id="description"
            label="Description"
            name="description"
            placeholder="Description product"
            required
            onChange={() => { }}
            error={getfieldErrors("description")}
            textarea
        />

        <FormField
            id="website"
            label="Website Url"
            name="website"
            placeholder="https://example.co"
            required
            onChange={() => { }}
            error={getfieldErrors("website")}
        />

        <FormField
            id="tags"
            label="tags"
            name="tags"
            placeholder="AI, Productivity, Saas"
            required
            onChange={() => { }}
            error={getfieldErrors("tags")}
            helperText="Comma-separated tags (e.q., AI, Saas, Productivity)"
        />

        <Button type="submit" className="w-full flex justify-center items-center bg-violet-400 hover:bg-violet-300 cursor-pointer">
            {
                isPending ?
                    <Loader2Icon className="size-4 animate-spin" />
                    : (
                        <>
                            <SparklesIcon className="size-4" />
                            Submit product
                        </>
                    )
            }

        </Button>
    </form>
}
