import React from 'react';
import Notification  from 'react-web-notification/lib/components/Notification';

//allow react dev tools work
//window.React = React;

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
      options: {},
    };

  }

  handlePermissionGranted(){
    //Permission Granted
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied(){
    //Permission Denied
    this.setState({
      ignore: true
    });
  }
  handleNotSupported(){
    //Web Notification not Supported
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick(e, tag){
    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
    console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
    this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  handleButtonClick = () => {
    const {ignore} = this.state
    if(ignore)
      return;
  
    const now = Date.now();

    const title = 'React-Web-Notification' + now;
    const body = 'Hello' + new Date();
    const tag = now;
    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag,
      body,
      icon,
      lang: 'en',
      dir: 'ltr',
      sound: '/sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    }
    this.setState({
      title,
      options: options
    });
  }

  render() {
    const {title, options, ignore} = this.state
    return (
      <div>
        <button onClick={this.handleButtonClick}>Notif!</button>
        <Notification
          ignore={ignore && title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={title}
          options={options}
        />
        <audio id='sound' preload='auto'>
          <source src='/sound.mp3' type='audio/mpeg' />
          <source src='/sound.ogg' type='audio/ogg' />
          <embed hidden='true' autostart='false' loop='false' src='/sound.mp3' />
        </audio>
      </div>
    )
  }
};

export default Notifications