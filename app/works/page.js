import Btn from '../components/ui/Btn/Btn';
import HeroText from '../components/ui/TextEffect/HeroText';
export default function Page() {
  return (
    <main
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyItems: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HeroText />
      </div>
    </main>
  );
}
