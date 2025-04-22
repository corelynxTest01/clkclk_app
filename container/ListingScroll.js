import { ScrollView } from "react-native";
import React, { Component } from "react";
import COLORS from "../constants/colors";

const HocListFunction = (OrginalComponent, style = {}) => {
  class EnhancedComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        contentHeight: 0,
        scrollView: 0,
      };
    }
    componentDidMount() {
      this.setState({ contentHeight: 0, scrollView: 0 });
    }
    componentWillUnmount() {
      this.setState({ contentHeight: 0, scrollView: 0 });
    }
    handleScroll = ({ nativeEvent }) => {
      const scrollY = nativeEvent.contentOffset.y;
      const scrollViewHeight = nativeEvent.layoutMeasurement.height;
      const contentHeight = nativeEvent.contentSize.height;
      this.setState({
        contentHeight: contentHeight,
        scrollView: scrollY + scrollViewHeight,
      });
    };
    render() {
      return (
        <ScrollView
          style={{ backgroundColor: COLORS.contBackground, ...style }}
          onScroll={this.handleScroll}
          scrollEventThrottle={0}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          scrollToOverflowEnabled={true}
          overScrollMode="always"
          keyboardShouldPersistTaps="handled"
        >
          <OrginalComponent {...this.state} {...this.props} />
        </ScrollView>
      );
    }
  }
  return EnhancedComponent;
};
export default HocListFunction;
