import {ActionTypes, PostsType, ProfilePageType} from "./store";
import {addPostActionCreator, profileReducer, ProfileType} from "./profileReducer";


let state:ProfilePageType={
    posts: [],
    profile: null,
    status:""
}
beforeEach(() => {
     state = {
         posts: [
             {id: 1, message: "Hello", likesCount: 1},
             {id: 2, message: "How hi your IT", likesCount: 5},
             {id: 3, message: "new meat in our garden", likesCount: 11},
             {id: 4, message: "hey", likesCount: 1},
             {id: 5, message: "YO", likesCount: 1}
         ],
         profile: null,
         status:""
}})


//ADD_POST tests
test('correct post should be added=> length +1', () => {
    const action: ActionTypes = addPostActionCreator("new POST")
   const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6);
});

test('correct post should be added => test text of post', () => {
    const action: ActionTypes = addPostActionCreator("new POST")
    const newState = profileReducer(state, action)
    expect(newState.posts[0].message).toBe("new POST");
});

//