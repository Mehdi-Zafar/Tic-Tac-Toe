import Boxes from "./components/Boxes"
import 'animate.css';
import {ImCross} from 'react-icons/im'
import {LuCircle} from 'react-icons/lu'


function App() {

  return (
    <div className="bg-gradient-to-r to-indigo-950 from-slate-900 min-h-screen">
      <h1 className="text-4xl text-amber-300 py-8 flex justify-center font-extrabold animate__animated animate__slideInDown"><ImCross/>&nbsp;Tic Tac Toe&nbsp;<LuCircle/></h1>
          <div className="animate__animated animate__backInUp">
            <Boxes/>
          </div>
    </div>
  )
}

export default App
