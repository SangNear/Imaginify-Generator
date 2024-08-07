"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { startTransition, useState } from "react"
import MediaUploader from "./MediaUploader"
import TranformedImage from "./TranformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})


const TranformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId
    } : defaultValues
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("submit values",values)
    }
    const tranformationType = transformationTypes[type]
    const [image, setImage] = useState(data)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isTranforming, setIsTranforming] = useState(false)
    const [tranformationConfig, setTranformationConfig] = useState(config)

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prev: any) => ({
            ...prev,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height
        }))

        setNewTransformation(tranformationType.config)

        return onChangeField(value)
    }
    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prev: any) => ({
                ...prev,
                [type]: {
                    ...prev?.[type],
                    [fieldName === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)
        return onChangeField(value)
    }
    const onTransformHandler = () => {
        setIsTranforming(true)

        setTranformationConfig(deepMergeObjects(newTransformation, tranformationConfig))

        setNewTransformation(null)

        // startTransition( async () => {
        //     await updateCredits(image, -1)
        // })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => <Input {...field} className="input-field" />}
                />

                {type === 'fill' && (
                    <CustomField
                        control={form.control}
                        name="aspectRatio"
                        className="w-full"
                        formLabel="Aspect Ratio"
                        render={({ field }) => (
                            <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                                <SelectTrigger className="select-field">
                                    <SelectValue placeholder="Selec size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((key) => (
                                        <SelectItem key={key} value={key} className="select-item">
                                            {aspectRatioOptions[key as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                )}

                {(type === 'remove' || type === 'recolor') && (
                    <div className="prompt-field">
                        <CustomField
                            control={form.control}
                            name="prompt"
                            className="w-full"
                            formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    className="input-field"
                                    onChange={(e) => onInputChangeHandler(
                                        'prompt',
                                        e.target.value,
                                        type,
                                        field.onChange
                                    )}
                                />
                            )}
                        />
                        {type === 'recolor' && (
                            <CustomField
                                control={form.control}
                                name="color"
                                formLabel="Replacement"
                                className="w-full"
                                render={({ field }) => (
                                    <Input
                                        value={field.value}
                                        className="input-field"
                                        onChange={(e) => onInputChangeHandler(
                                            'color',
                                            e.target.value,
                                            'recolor',
                                            field.onChange
                                        )}
                                    />
                                )}
                            />
                        )}
                    </div>
                )}

                <div className="media-uploader-field">
                    <CustomField
                        control={form.control}
                        name="publicId"
                        className="flex size-full flex-col"
                        render={({ field }) => (
                            <MediaUploader
                                onValueChange={field.onChange}
                                setImage={setImage}
                                publicId={field.value}
                                image={image}
                                type={type}
                            />
                        )}
                    />
                    <TranformedImage
                        image={image}
                        type={type}
                        title={form.getValues().title}
                        isTransforming={isTranforming}
                        setIsTransforming={setIsTranforming}
                        transformationConfig={tranformationConfig}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        type="button"
                        className="submit-button"
                        disabled={isTranforming || newTransformation === null}
                        onClick={onTransformHandler}
                    >
                        {isTranforming ? "Tranforming" : "Apply transformation"}
                    </Button>
                    <Button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submiting" : "Save Image"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default TranformationForm