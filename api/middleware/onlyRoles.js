/**
 * Accepts an array of role_ids which have permission to access the endpoint,
 * if the role_id in the profile added to the request header by authRequired
 * middleware matches one of the role_ids in the parameter array, proceeds with
 * the request, otherwise sends a 403 response and denies access.
 */
const onlyRoles = (role_ids) => (req, res, next) => {
  const profile = req.profile;
  let authorized = false;

  role_ids.forEach((role_id) => {
    if (profile.role_id == role_id) {
      authorized = true;
      return;
    }
  });

  if (authorized) {
    next();
  } else {
    res
      .status(403)
      .json({ message: 'User does not have required permissions' });
  }
};

module.exports = { onlyRoles };
