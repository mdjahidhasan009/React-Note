import './App.css'
// import {SemiComplexForm} from "@/features/semi-complex-form/SemiComplexForm.tsx";
import {Playground} from "@/features/Playground/Playground.tsx";

function App() {

  return (
    <div className="min-h-screen w-full">
        <div className="container mx-auto py-4">
            <h1 className="text-4xl font-bold text-poppins">
                Mastering Complex Forms
            </h1>

            <div className="max-w-2xl mt-10">
                {/*<SemiComplexForm />*/}
                <Playground />
            </div>
        </div>
    </div>
  )
}

export default App
