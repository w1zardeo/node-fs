function validateSkipAndLimit(skip, limit) {
    return !isNaN(parseInt(skip)) && !isNaN(parseInt(limit));
  }
  
  function validateSort(sort) {
    const validSortProperties = ['year', 'rating', 'views'];
    return validSortProperties.includes(sort);
  }
  
  function validateSortOrder(sortOrder) {
    const validSortOrders = ['asc', 'desc'];
    return validSortOrders.includes(sortOrder);
  }
  
  module.exports = {
    validateSkipAndLimit,
    validateSort,
    validateSortOrder
  };