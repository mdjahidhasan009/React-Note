import './App.css'
import {EmployeeOnboarding} from "@/features/employee-onboarding/EmployeeOnboarding.tsx";
import { Button } from './components/ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from './components/ui/dialog';

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
    // <div className="min-h-screen w-full">
    //     <div className="container mx-auto py-4">
    //         {/*<h1 className="text-4xl font-bold text-poppins">*/}
    //         {/*    Mastering Complex Forms*/}
    //         {/*</h1>*/}
    //
    //         <div className="max-w-2xl mt-10">
    //             {/*<SemiComplexForm />*/}
    //             {/*<Playground />*/}
    //             <EmployeeOnboarding />
    //
    //
    //             {/*/!*Example of using input component which is not present in the generic form*!/*/}
    //             {/*<div className="max-w-2xl mt-10 mx-auto">*/}
    //             {/*    <GenericForm*/}
    //             {/*        schema={postSchema}*/}
    //             {/*        initialValues={{ title: "", content: "Default content of textarea"}}*/}
    //             {/*        onSubmit={(data) => {*/}
    //             {/*            alert('Form submitted');*/}
    //             {/*            console.log(data);*/}
    //             {/*        }}*/}
    //             {/*        ref={formRef}*/}
    //             {/*    >*/}
    //             {/*        <div className="space-y-4">*/}
    //             {/*            <TextField<TPostType> name="title" label="Title" />*/}
    //
    //             {/*            /!*Add a formfield which is not present in generic form as component*!/*/}
    //             {/*            <FormField*/}
    //             {/*                control={formRef.current?.control}*/}
    //             {/*                name="content"*/}
    //             {/*                render={({ field} ) => (*/}
    //             {/*                    <Textarea { ...field } />*/}
    //             {/*                )}*/}
    //             {/*            />*/}
    //             {/*            <Button type="submit">Submit</Button>*/}
    //             {/*        </div>*/}
    //             {/*    </GenericForm>*/}
    //
    //             {/*</div>*/}
    //         </div>
    //     </div>
    // </div>
      <div className="bg-zinc-100 min-h-screen">
          <nav className="dark bg-background p-4">
              <div className="container mx-auto flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white">MY HR</h1>
                  <Button>My Profile</Button>
              </div>
          </nav>
          <div className="container mx-auto py-4">
              <h1 className="text-2xl font-bold">Employee Onboarding</h1>
              <p>
                  Welcome to the employee onboarding process. Please fill in the
                  following information to get started.
              </p>
              <Dialog>
                  <DialogTrigger asChild>
                      <Button className="mt-4">New Employee</Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                          <DialogTitle>New Employee</DialogTitle>
                      </DialogHeader>
                      <EmployeeOnboarding />
                  </DialogContent>
              </Dialog>
          </div>
      </div>
  )
}

export default App
