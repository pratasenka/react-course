import React from 'react';

export class Counter extends React.Component<
  { initValue: number },
  { count: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { count: props.initValue };
  }

  private createCounter = (): React.ReactElement => React.createElement('div', { style: this.getCounterStyle() }, [
    this.createButton('-', this.decrease),
    this.createLabel(this.state.count),
    this.createButton('+', this.increase),
  ]);

  private createButton = (
    btnName: string,
    callback: () => void,
  ): React.ReactElement => React.createElement(
    'button',
    {
      key: btnName,
      id: btnName,
      style: this.getButtonStyle(),
      onClick: () => callback(),
    },
    btnName,
  );

  private createLabel = (initValue: number): React.ReactElement => React.createElement(
    'span',
    {
      key: 'counterLabel',
      id: 'counterLabel',
      'data-testid': 'counterLabel',
      style: this.getLabelStyle(),
    },
    initValue,
  );

  private increase = (): void => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  private decrease = (): void => {
    this.setState((state) => ({ count: state.count - 1 }));
  };

  private getLabelStyle = (): any => ({
    margin: '0 20px',
  });

  private getButtonStyle = (): any => ({
    margin: '0 20px',
    height: '30px',
    width: '30px',
    border: '0px',
    borderRadius: '4px',
  });

  private getCounterStyle = () => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  });

  render(): React.ReactNode {
    return this.createCounter();
  }
}
