module.exports = {
	/** This rule disables directly accessing properties of a store hook without using a selector function inside of them. The reason for this is because we have experienced performance issues due to equality checks when doing this.
	 * E.g.:
	 * Bad  : useDriftStore().connection
	 * Good : useDriftStore(s=>s.connection)
	 */
	'no-bad-store-data-access': {
		meta: {
			docs: {
				description: 'BAD',
				category: 'BAD',
			},
			schema: [],
		},
		create(context) {
			return {
				CallExpression(node) {
					const callee = node.callee;

					// Check if the function name matches the regex
					if (
						callee.type === 'Identifier' &&
						/use[a-zA-Z]+Store/.test(callee.name)
					) {
						const sourceCode = context.getSourceCode();
						const nextToken = sourceCode.getTokenAfter(node);

						// Check if the next token is a period (.)
						if (
							nextToken &&
							nextToken.type === 'Punctuator' &&
							nextToken.value === '.'
						) {
							context.report({
								node,
								message:
									'Found a matching useStore hook with property access. Use a selector function inside of the hook instead.',
							});
						}
					}
				},
			};
		},
	},
};
