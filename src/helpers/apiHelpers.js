const asyncWrapper = (controller) => {
    return (req, res, next) => {
        try {
            controller(req, res)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {asyncWrapper};