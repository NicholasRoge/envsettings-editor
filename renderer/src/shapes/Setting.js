import PropTypes from 'prop-types'


export default PropTypes.shape({
    id: PropTypes.number.isRequired,

    handler: PropTypes.string,
    params: PropTypes.arrayOf(PropTypes.string)
})