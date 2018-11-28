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
  private readonly LOW_BANDWIDTH_LIMIT: number = 0.512; // 512 kbps

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
    const { networkStatus } = this.state;
    return (
      <div className={networkStatus === NetworkStatus.Online ? "success" : (networkStatus === NetworkStatus.LowBandwidth ? "warning" : "error")}>
        Current Status: {NetworkStatus[networkStatus]} <br/>
        Downlink: {this.state.connection.downlink},
        RTT: {this.state.connection.rtt},
        EffectiveType: {this.state.connection.effectiveType}
      </div>
    );
  }

  private updateConnectionStatus() {
    this.setState({
      connection: (navigator as any).connection,
      networkStatus:  this.getNetworkStatus(this.state.connection)
    });
  }

  private getNetworkStatus(connection: any): NetworkStatus {
    const { downlink } = connection;

    if (!navigator.onLine) {
      return NetworkStatus.Offline;
    }

    if (downlink === 0) {
      return NetworkStatus.Offline;
    } else if (downlink < this.LOW_BANDWIDTH_LIMIT) {
      return NetworkStatus.LowBandwidth;
    } else {
      return NetworkStatus.Online;
    }
  }
}