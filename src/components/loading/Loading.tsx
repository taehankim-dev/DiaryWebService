import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoadingState } from '@states/PopupState';

import { LoadingLayout, LoadingContainer, LoadingBorder, LoadingText} from "@styles/PopupStyle";

const Loading : React.FC = () => {
  const [isLoading] = useRecoilState(isLoadingState);

  return (
    <>
      {isLoading ?
        <LoadingLayout>
          <LoadingContainer>
            <LoadingBorder />
            <LoadingText>loading...</LoadingText> 
          </LoadingContainer>
          
        </LoadingLayout>
        :
        <></>
      }
    </>
  )
}

export default Loading;