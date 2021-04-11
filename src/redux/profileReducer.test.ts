import {ActionTypes, PostsType, ProfilePageType} from "./store";
import {
    addPostActionCreator,
    deletePost,
    profileReducer,
    ProfileType,
    SET_USER_PROFILE,
    setStatus
} from "./profileReducer";


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
test('correct post should be added=> posts.length +1', () => {
    const action: ActionTypes = addPostActionCreator("new POST")
   const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6);
});

test('correct post should be added => test text of post', () => {
    const action: ActionTypes = addPostActionCreator("new POST")
    const newState = profileReducer(state, action)
    expect(newState.posts[0].message).toBe("new POST");
});

//DELETE_POST tests
test('correct post should be deleted => posts.id', () => {
    const action: ActionTypes = deletePost(3)
    const newState = profileReducer(state, action)
    expect(newState.posts[2].id).toBe(4);

});

test('correct post should be deleted => posts.length -1', () => {
    const action: ActionTypes = deletePost(1)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4);

});

test('Incorrect post will not  be deleted => posts.length doesn\'t change value ', () => {
    const action: ActionTypes = deletePost(11111)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5);

});

// SET_STATUS tests
test('correct status should be added', () => {
    const action: ActionTypes = setStatus("my cool status")
    const newState = profileReducer(state, action)
    expect(newState.status).toBe("my cool status");

});

//SET_USER_PROFILE: