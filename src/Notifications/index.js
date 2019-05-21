import React from 'react';
import Notification  from 'react-web-notification/lib/components/Notification';
import axios from 'axios';
import Image from 'react-bootstrap/lib/Image';
import "./index.css";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';


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
        ETC: {above: undefined, below: undefined}
      }
    };

    this.coins = props.coins;
    this.coinPrices = {};
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
    let title = ''
    for (let targetCoin in targetPrices)  {
        if (this.coinPrices[targetCoin] > targetPrices[targetCoin].above
          || this.coinPrices[targetCoin] < targetPrices[targetCoin].below) {
            title = targetCoin;            
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
              options,
            });          
          }
    }

  }

  getUSDPrices() {
    axios.get(this.apiURL).then(res => {
        for (let coin in res.data)
          this.coinPrices[coin] = res.data[coin]['USD']
    })    
  }

  checkForNotif = () => {
       this.handleButtonClick()
  }

  handleOnAboveChange = (value, coin) => {
    const {targetPrices} = this.state;
    targetPrices[coin.id]['above'] = value;
    this.setState({
      targetPrices
    })
  }
  
  handleOnBelowChange = (value, coin) => {
    const {targetPrices} = this.state;
    targetPrices[coin.id]['below'] = value;
    this.setState({
      targetPrices
    })
  }

  componentDidMount() {
    this.getUSDPrices()
    this.notifInterval = setInterval(this.checkForNotif, 65000);
    this.setPrices = setInterval(this.getUSDPrices.bind(this), 60000)
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.setPrices);
  }

  render() {
    const {title, options, ignore, targetPrices} = this.state    
    return (
      <div>
        <button onClick={this.handleButtonClick}>Notif!</button>
        {
          this.coins.slice(7, 8).map(coin => 
            <div>
              <div class="post-container">                
                <div class="post-thumb"><Image src={"/images/"+coin.image} className="notifImage" /></div>
                
                <div class="post-content">
                    <h3 className="post-title">Above</h3>
                    <Slider
                      min={this.coinPrices[coin.id]}
                      max={this.coinPrices[coin.id]+1000}
                      value={targetPrices[coin.id].above > 0 ? targetPrices[coin.id].above : this.coinPrices[coin.id]}
                      orientation="horizontal"
                      onChange={ (volume) => this.handleOnAboveChange(volume, coin)}
                    />
                    <h3 className="post-title" >Below</h3>
                    <Slider
                      min={0}
                      max={this.coinPrices[coin.id]}
                      value={targetPrices[coin.id].below > 0 ? targetPrices[coin.id].below : this.coinPrices[coin.id]}
                      orientation="horizontal"
                      onChange={ (volume) => this.handleOnBelowChange(volume, coin)}
                    />
                </div>
              </div>
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