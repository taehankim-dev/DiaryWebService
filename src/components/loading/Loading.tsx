import React from 'react';
import { LoadingLayout, LoadingContainer, LoadingBorder, LoadingText} from "@styles/PopupStyle";

const Loading : React.FC = () => {
  return (
    <LoadingLayout>
      <LoadingContainer>
        <LoadingBorder />
        <LoadingText>loading...</LoadingText> 
      </LoadingContainer>
      
    </LoadingLayout>
  )
}

export default Loading;