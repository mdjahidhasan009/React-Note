import './App.css'
import {Playground} from "@/features/Playground/Playground.tsx";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// const postSchema = z.object({
//     title: z.string().min(1, { message: "Title is required" }),
//     content: z.string().min(1, { message: "Content is required" }),
// });

// type TPostType = z.infer<typeof postSchema>;

function App() {
  // const formRef = useRef<TGenericFormRef<TPostType>>(null);

  //This is not resetting because it is outside the form the context is not available
  // useEffect(() => {
  //     const setData = async () => {
  //         await sleep(3000);
  //         formRef.current?.reset({
  //             title: "New title",
  //             content: "New content"
  //         });
  //     }
  //
  //     setData();
  // }, []);

  return (
    <div className="min-h-screen w-full">
        <div className="container mx-auto py-4">
            <h1 className="text-4xl font-bold text-poppins">
                Mastering Complex Forms
            </h1>

            <div className="max-w-2xl mt-10">
                {/*<SemiComplexForm />*/}
                <Playground />


                {/*/!*Example of using input component which is not present in the generic form*!/*/}
                {/*<div className="max-w-2xl mt-10 mx-auto">*/}
                {/*    <GenericForm*/}
                {/*        schema={postSchema}*/}
                {/*        initialValues={{ title: "", content: "Default content of textarea"}}*/}
                {/*        onSubmit={(data) => {*/}
                {/*            alert('Form submitted');*/}
                {/*            console.log(data);*/}
                {/*        }}*/}
                {/*        ref={formRef}*/}
                {/*    >*/}
                {/*        <div className="space-y-4">*/}
                {/*            <TextField<TPostType> name="title" label="Title" />*/}

                {/*            /!*Add a formfield which is not present in generic form as component*!/*/}
                {/*            <FormField*/}
                {/*                control={formRef.current?.control}*/}
                {/*                name="content"*/}
                {/*                render={({ field} ) => (*/}
                {/*                    <Textarea { ...field } />*/}
                {/*                )}*/}
                {/*            />*/}
                {/*            <Button type="submit">Submit</Button>*/}
                {/*        </div>*/}
                {/*    </GenericForm>*/}

                {/*</div>*/}
            </div>
        </div>
    </div>
  )
}

export default App
