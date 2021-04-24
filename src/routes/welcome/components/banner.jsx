import {Carousel} from 'antd-mobile';
import React from 'react'

class Banner extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['1', '2', '3'],
      });
    }, 100);
  }

  render() {
    return (
      <Carousel
        autoplay={false}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {this.state.data.map(val => (
          <a
            key={val}
            href="轮播图"
            style={{display: 'inline-block', width: '100%'}}
          >
            <img
              src={require(`../../../assets/banner${val}.png`)}
              alt=""
              style={{width: '100%', verticalAlign: 'top', height: '100%'}}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({imgHeight: 'auto'});
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  }
}

export default Banner;
