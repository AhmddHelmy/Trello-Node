
export const validation = (schema) => {
    return (req, res, next) => {
        const keys = {...req.body, ...req.params, ...req.query}
        const valResult = schema.validate(keys, {abortEarly: false})
        if (valResult?.error?.details) {
            return res.status(406).json({message: 'validation error'})
        }
        next()
    }
}
