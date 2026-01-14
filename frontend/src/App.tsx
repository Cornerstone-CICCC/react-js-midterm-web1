import { UserContextProvider } from "./context/user/UserContextProvider"

type Props = {}

const App = (props: Props) => {
  return (
    <UserContextProvider>
    <div>App</div>
    </UserContextProvider>
  )
}

export default App
