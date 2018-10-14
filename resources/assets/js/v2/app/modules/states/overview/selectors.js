const buildStatistic = state => state.get('overview').get('overview').get('buildStatistic').toJS()
const datas = state => state.get('overview').get('overview').get('datas').toJS()
const styles = state => state.get('overview').get('overview').get('styles').toJS()
const statisticCharts = state => state.get('overview').get('overview').get('statistic').toJS()
const statisticStyles = state => state.get('overview').get('overview').get('statisticStyles').toJS()
const fetchingData = state => state.get('overview').get('status').get('fetchingData')
const fetchDataSuccess = state => state.get('overview').get('status').get('fetchDataSuccess')
const fetchDataError = state => state.get('overview').get('status').get('fetchDataError')

export default {
    fetchingData,
    fetchDataSuccess,
    fetchDataError,
    buildStatistic,
    datas,
    styles,
    statisticCharts,
    statisticStyles
}
