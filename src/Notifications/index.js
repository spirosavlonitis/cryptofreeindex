import React from 'react';
import Notification  from 'react-web-notification/lib/components/Notification';
import axios from 'axios';
import Image from 'react-bootstrap/lib/Image';
import "./index.css";

//allow react dev tools work
//window.React = React;

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: '',
      options: {
        lang: 'en',
        dir: 'ltr',
        sound: '/sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      },
      targetPrices: {
        ETC: {above: 7.75, below: 7.70}
      }
    };

    this.coinPrices = {};
    this.coins = props.coins;
    this.api_key = "a63f5a0b90417a8c7dd8a72c4245176dee7288e9890642f1175835f65b04a523"

    this.apiURL ="https://min-api.cryptocompare.com/data/pricemulti?fsyms="+props.navCoins.join()+
                 "&tsyms=USD&api_key="+this.api_key
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
//    console.log(e, 'Notification clicked tag:' + tag);
  }

  handleNotificationOnError(e, tag){
    console.log(e, 'Notification error tag:' + tag);
  }

  handleNotificationOnClose(e, tag){
  //  console.log(e, 'Notification closed tag:' + tag);
  }

  handleNotificationOnShow(e, tag){
//    this.playSound();
//    console.log(e, 'Notification shown tag:' + tag);
  }

  playSound(filename){
    document.getElementById('sound').play();
  }

  handleButtonClick = () => {
    const {ignore, targetPrices} = this.state
    if(ignore)
      return;

    for (let targetCoin in targetPrices)  {
        if (this.coinPrices[targetCoin] > targetPrices[targetCoin].above 
          || this.coinPrices[targetCoin] < targetPrices[targetCoin].below) {
            const title = targetCoin;            
            let body, tag;      // unique tag to prevent duplicate notifications
            if (this.coinPrices[targetCoin] > targetPrices[targetCoin].above){
              body = targetCoin+' above $ '+targetPrices[targetCoin].above
              tag = targetCoin+' above '+targetPrices[targetCoin].above;
            }else{
              body = targetCoin+' below $ '+targetPrices[targetCoin].below
              tag = targetCoin+' below '+targetPrices[targetCoin].above;
            }
            
            let icon;
            this.coins.forEach( coin => {
              if (coin.id === targetCoin)
                icon = "/images/"+coin.image
            } )
            // Available options
            // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
            const options = {
              tag,
              body,
              icon,
            }
            this.setState({
              title,
              options
            });
            
          }
    }

  }

  getUSDPrices() {
    axios.get(this.apiURL).then(res => {
        for (let coin in res.data)
          this.coinPrices[coin] = res.data[coin]['USD']
        
        this.handleButtonClick()
    })
    
  }

  componentDidMount() {
    this.interval = setInterval(this.getUSDPrices.bind(this), 60000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {title, options, ignore} = this.state
    return (
      <div>
        <button onClick={this.handleButtonClick}>Notif!</button>


        {
          this.coins.slice(1, this.coins.length).map(coin => 
            <div>
              <Image src={"/images/"+coin.image} className="notifImage" />
              <br/><br/>
            </div>
          )
        }
        <Notification
          ignore={ignore && title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={10000}
          title={title}
          options={options}
        />
      </div>
    )
  }
};

export default Notifications