import PropTypes from 'prop-types'


export default PropTypes.shape({
    setting: PropTypes.number.isRequired,
    environment: PropTypes.string.isRequired,

    value: PropTypes.string.isRequired,
    isDefault: PropTypes.bool.isRequired
})