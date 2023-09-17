const { DuplicatedError } = require('/project/commons/errors')
const userIndex = require('/project/commons/db').in('users')

module.exports = ({ body: { email, password } }, res) => {
  if (userIndex.find({ email }))
    throw new DuplicatedError({ email })

  const created_at = Date.now().toString()
  userIndex.new().writeMany({ email, password, created_at })
  return res.json({ created_at })
}
