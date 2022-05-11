import { useAppSelector } from "../../context/store/utils/store_utils";

function Splash() {

  const currentUser = useAppSelector(state => state.session.user);

  if (currentUser) return (
    <section className='section'>
      This is definitely where I parked my car!
      <div className='spinner'></div>
    </section>
  )

  return (
    <section className='section'>
      Is this where i parked my caar?
    </section>
  )
}

export default Splash;