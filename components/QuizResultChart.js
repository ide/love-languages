import maxBy from 'lodash/maxBy';
import PropTypes from 'prop-types';
import React from 'react';
import { Animated, StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import Theme from '../styles/Theme';

export default class QuizResultChart extends React.Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    style: ViewPropTypes.style,
  };

  state = {
    measuredBarWidth: null,
  };

  render() {
    // Compute the widths of each bar
    let maxScore = maxBy(this.props.results, result => result.score).score;
    let relativeScores = {};
    for (let result of this.props.results) {
      relativeScores[result.language] = result.score / maxScore;
    }

    return (
      <View style={this.props.style}>
        {this.props.results.map((result, ii) => (
          <ChartRow
            key={result.language}
            label={result.language}
            score={result.score}
            barColor={Theme.languageColors[result.language]}
            barWidth={
              this.state.measuredBarWidth != null
                ? relativeScores[result.language] * this.state.measuredBarWidth
                : 0
            }
            onBarContainerLayout={ii === 0 ? this._measureBarRegion : null}
            style={ii === this.props.results.length - 1 ? styles.lastChartRow : null}
          />
        ))}
      </View>
    );
  }

  _measureBarRegion = ({ nativeEvent: { layout } }) => {
    this.setState({ measuredBarWidth: layout.width });
  };
}

class ChartRow extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    barColor: PropTypes.string.isRequired,
    barWidth: PropTypes.number.isRequired,
    onBarContainerLayout: PropTypes.func,
    style: ViewPropTypes.style,
  };

  render() {
    return (
      <View style={[styles.chartRow, this.props.style]}>
        <Text
          style={[styles.chartBarLabel, this.props.score === 0 ? styles.chartBarZeroLabel : null]}>
          {this.props.label}
        </Text>
        <View onLayout={this.props.onBarContainerLayout} style={styles.chartBarContainer}>
          <Animated.View
            style={[
              styles.chartBar,
              {
                backgroundColor: this.props.barColor,
                width: this.props.barWidth,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chartRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  lastChartRow: {
    marginBottom: 0,
  },
  chartBarLabel: {
    color: Theme.darkTextColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
    width: 80,
  },
  chartBarZeroLabel: {
    color: '#666',
  },
  chartBarContainer: {
    flex: 1,
  },
  chartBar: {
    borderRadius: 2,
    height: 24,
  },
});
