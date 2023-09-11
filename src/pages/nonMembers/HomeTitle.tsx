import { ScrollInduce, TitleSection } from "@styles/PageLayout"

export const HomeTitle : React.FC = () => {
  return (
    <TitleSection>
      <div>
        <h2>안녕하세요!</h2>
        <p>저희 페이지에서 사용할 수 있는 기능들에 대해 소개해 드릴게요.</p>
        <ScrollInduce>
          <span />
          <p>Scroll</p>
        </ScrollInduce>
      </div>
    </TitleSection>
  )
}