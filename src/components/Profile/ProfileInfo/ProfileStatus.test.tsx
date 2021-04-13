import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatusComponent", () => {
    test("status from props shoul be in the state", () => {
        const component = create(<ProfileStatus status="some  start status" updateStatus={() => {
        }}/>)
        const instance = component.getInstance()
        // @ts-ignore
        expect(instance.state.status).toBe("some  start status")
    })
    test("after creation  span should be displayed", () => {
        const component = create(<ProfileStatus status="some  start status" updateStatus={() => {
        }}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span).not.toBeNull()
    })
    test("after creation  input should be displayed", () => {
        const component = create(<ProfileStatus status="some  start status" updateStatus={() => {
        }}/>)
        const root = component.root
        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    })
    test('after creation  span text  should be correct', () => {
        const component = create(<ProfileStatus status="some  start status" updateStatus={() => {
        }}/>)
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("some  start status")
    })
    test('input should be in editMode instead of span', () => {
        const component = create(<ProfileStatus status="some  start status" updateStatus={() => {
        }}/>)
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("some  start status")
    })

    test('callback should be called', () => {
        const mockCallBack = jest.fn() // тестовая функция для обработк наших вызовов колбэка
        const component = create(<ProfileStatus status="some  start status" updateStatus={mockCallBack}/>)
        const instance = component.getInstance()
        // @ts-ignore
        instance.deactivateEditMode()
        expect(mockCallBack.mock.calls.length).toBe(1)
    })
})