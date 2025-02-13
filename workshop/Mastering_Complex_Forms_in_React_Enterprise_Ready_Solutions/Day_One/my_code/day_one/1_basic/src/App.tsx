import './App.css'
import {BasicForm} from "@/features/basic/BasicForm.tsx";

function App() {

  return (
    <div className="min-h-screen w-full">
        <div className="container mx-auto py-4">
            <h1 className="text-4xl font-bold text-poppins">
                Mastering Complex Forms
            </h1>

            <div className="max-w-2xl mt-10">
                <BasicForm />
            </div>
        </div>
    </div>
  )
}

export default App
