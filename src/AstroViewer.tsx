import * as React from "react";

interface IAstronomyViwerState {
  date: Date;
  img: string;
  hdImg: string;
  title: string;
  description: string;
  credits: string;
  isHDShowing: boolean;
}

export default class AstronomyViewer extends React.Component<
  {},
  IAstronomyViwerState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      date: new Date(),
      isHDShowing: false
    } as IAstronomyViwerState;

    this.updateDate = this.updateDate.bind(this);
    this.toggleHDPreview = this.toggleHDPreview.bind(this);
  }

  public componentWillMount() {
    this.getAstroData();
  }

  public render() {
    return (
      <div className="viewer-container">
        <div className="viewer-nav">
          <button onClick={() => this.updateDate(-1)}>Prev</button>
          <button onClick={() => this.updateDate(1)} disabled={this.state.date.toDateString() === new Date().toDateString()}>Next</button>
        </div>
        <section className="container">
          <div className="image-wrapper">
            <p className="App-intro">{this.state.title}</p>
            <a onClick={() => this.toggleHDPreview(true)}>
              <img className="astro-image" src={this.state.img} />
            </a>
            <div>
              <span className="small-text">Date: {this.state.date.toDateString()}</span>
              <span> | </span>
              <span className="small-text">Image Credits: {this.state.credits}</span>
            </div>
          </div>
          <div className="App-paragraph">{this.state.description}</div>
        </section>

        <div className="hd-preview" style={{display: this.state.isHDShowing ? 'block' : 'none'}} onClick={() => this.toggleHDPreview(false)}>
          <img src={this.state.isHDShowing ? this.state.hdImg : ''} />
        </div>
      </div>
    );
  }

  private getAstroData() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=GROe2oMg4PxZtJEgfj4VzG1eyeqeAGXVvMV6H2oK&date=${this.formatDate(
      this.state.date
    )}`;
    fetch(url)
      .then(response => response.json())
      .then(astroDto => {
        this.setState({
          description: astroDto.explanation,
          hdImg: astroDto.hdurl,
          img: astroDto.url,
          title: astroDto.title,
          credits: astroDto.copyright
        });
      });
  }

  private updateDate(offset: number) {
    let newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + offset);
    this.setState(
      {
        date: newDate
      },
      this.getAstroData
    );
  }

  private toggleHDPreview(isShowing: boolean = false) {
    this.setState({
      isHDShowing: isShowing
    });
  }

  private formatDate(d: Date) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
}
