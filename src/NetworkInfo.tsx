import * as React from 'react';

interface INetworkInfoState {
  connection: any;
  networkStatus: NetworkStatus;
}

enum NetworkStatus {
  Offline,
  LowBandwidth,
  Online
}
export default class NetworkInfo extends React.Component<{}, INetworkInfoState> {
  constructor(props: {}) {
    super(props);
    const connection = (navigator as any).connection;
    this.state = {
      connection: connection,
      networkStatus: this.getNetworkStatus(connection)
    };
    this.updateConnectionStatus = this.updateConnectionStatus.bind(this);
    this.getNetworkStatus = this.getNetworkStatus.bind(this);
    connection.addEventListener('change', this.updateConnectionStatus);
  }

  public render() {
    const netStatus = this.getNetworkStatus(this.state.connection);
    return (
      <div className={netStatus === NetworkStatus.Online ? "success" : (netStatus === NetworkStatus.LowBandwidth ? "warning" : "error")}>
        Network Info: 
        Downlink: {this.state.connection.downlink},
        RTT: {this.state.connection.rtt},
        EffectiveType: {this.state.connection.effectiveType}
      </div>
    );
  }

  private updateConnectionStatus() {
    this.setState({
      connection: (navigator as any).connection
    });
  }

  private getNetworkStatus(connection: any): NetworkStatus {
    const { rtt, downlink } = connection;

    if (rtt === 0 || downlink === 0) {
      return NetworkStatus.Offline;
    } else if (rtt > 1000 || downlink < 1) {
      return NetworkStatus.LowBandwidth;
    } else {
      return NetworkStatus.Online;
    }
  }
}