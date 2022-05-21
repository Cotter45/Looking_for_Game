
import background from "./mario_background.png";
import mario from "./mario.png";

function MonitorDefault() {

  return (
    <div className='fade_in monitor_display'>
      {/* <img src={background} className='scene' alt='Mario Background' /> */}
      <div style={{ background: `url(${background}) 0 60% repeat-x` }} className="scene"></div>
        <input type="checkbox" checked></input>
        <img src={mario} className='mario' alt='Mario' />
      {/* </div> */}
    </div>
  )
}

export default MonitorDefault;