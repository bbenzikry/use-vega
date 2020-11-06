import { Dispatch, MutableRefObject, SetStateAction } from 'react';
declare const useRefState: <S>(initialState: S | (() => S)) => [MutableRefObject<S>, Dispatch<SetStateAction<S>>];
export default useRefState;
