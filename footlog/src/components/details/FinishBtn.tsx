import { FlagIcon } from '@public/icon';

interface FinishBtnProps {
  isComplete: boolean;
}

export default function FinishBtn(props: FinishBtnProps) {
  const { isComplete } = props;

  return (
    <section className="fixed bottom-68pxr bg-white px-24pxr py-20pxr">
      <button
        type="button"
        className={`flex h-48pxr w-345pxr items-center justify-center rounded-xl ${isComplete ? 'not-allowed bg-gray_2' : 'pointer bg-main-green'}`}
        onClick={() => {}}>
        <p className="fonts-onboardingBtn">{isComplete ? '완주 완료' : '완주하기'}</p>
      </button>
    </section>
  );
}
