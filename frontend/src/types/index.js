/**
 * @typedef {Object} Citation
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} publication
 * @property {number} year
 * @property {string} url
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} content
 * @property {'user' | 'assistant' | 'system'} role
 * @property {Date} timestamp
 * @property {Citation[]} [citations]
 */

/**
 * @typedef {Object} GraphNode
 * @property {string} id
 * @property {string} label
 * @property {number} group
 * @property {Object} [metadata]
 */

/**
 * @typedef {Object} GraphLink
 * @property {string} source
 * @property {string} target
 * @property {number} value
 * @property {string} [label]
 */
