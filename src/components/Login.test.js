import { fireEvent, render,screen, waitFor } from "@testing-library/react"
import Login from "./Login.jsx"

jest.mock("axios",()=>({
     __esModule: true,
    default: {
        get: ()=>({
            data: {id:1, name:"john"},
        }),
    },
}))

test('userame input should be rendered', () =>{
    render(<Login/>)
    const userInputElement = screen.getByPlaceholderText(/username/i)
    expect(userInputElement).toBeInTheDocument()
});

test('password input should be rendered', () =>{
    render(<Login/>)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)
    expect(passwordInputElement).toBeInTheDocument()
})

test('button should be rendered', () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    expect(buttonInputElement).toBeInTheDocument()
})

test('user input should be empty', () =>{
    render(<Login/>)
    const userInputElement = screen.getByPlaceholderText(/username/i)
    expect(userInputElement.value).toBe("")
})

test('password input should be empty', () =>{
    render(<Login/>)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)
    expect(passwordInputElement.value).toBe("")
})

test('button should be disabled', () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    expect(buttonInputElement).toBeDisabled()
   
})

test('loading should not be render', () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    expect(buttonInputElement).not.toHaveTextContent(/please wait/i)
})


test('error message should no be visible', ()=>{
    render(<Login/>)
    const errorEle = screen.getByTestId("error")
    expect(errorEle).not.toBeVisible()
})

test('user input should change', () =>{
    render(<Login/>)
    const userInputElement = screen.getByPlaceholderText(/username/i)
    const testvalue = "test"
    fireEvent.change(userInputElement,{target: { value: testvalue} })

    expect(userInputElement.value).toBe(testvalue)
})

test('password input should change', () =>{
    render(<Login/>)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)
    const testvalue = "test"
    fireEvent.change(passwordInputElement,{target: { value: testvalue} })
    expect(passwordInputElement.value).toBe(testvalue)
})

test('button should not be disabled when input exists', () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    const userInputElement = screen.getByPlaceholderText(/username/i)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)
    const testvalue = "test"

    fireEvent.change(userInputElement,{target: { value: testvalue} })
    fireEvent.change(passwordInputElement,{target: { value: testvalue} })

    expect(buttonInputElement).not.toBeDisabled()
})

test('loading should be render when clicked', () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    const userInputElement = screen.getByPlaceholderText(/username/i)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)

    const testvalue = "test"
    
    fireEvent.change(userInputElement,{target: { value: testvalue} })
    fireEvent.change(passwordInputElement,{target: { value: testvalue} })
    fireEvent.click(buttonInputElement)
    expect(buttonInputElement).toHaveTextContent(/please wait/i)
})

test('loading should not be render after fetch', async () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    const userInputElement = screen.getByPlaceholderText(/username/i)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)

    const testvalue = "test"
    
    fireEvent.change(userInputElement,{target: { value: testvalue} })
    fireEvent.change(passwordInputElement,{target: { value: testvalue} })
    fireEvent.click(buttonInputElement)
    await waitFor(()=>{
        expect(buttonInputElement).not.toHaveTextContent(/please wait/i)
    }) 
})


test('user should  be render after fetch', async () =>{
    render(<Login/>)
    const buttonInputElement = screen.getByRole("button")
    const userInputElement = screen.getByPlaceholderText(/username/i)
    const passwordInputElement = screen.getByPlaceholderText(/password/i)

    const testvalue = "test"
    
    fireEvent.change(userInputElement,{target: { value: testvalue} })
    fireEvent.change(passwordInputElement,{target: { value: testvalue} })
    fireEvent.click(buttonInputElement)

    const userItem = await screen.findByText("john")
    expect(userItem).toBeInTheDocument()

})
