
export interface WindowsShortName {
	/**
	 * Gets the short path name of the given long path.
	 * Null if a short name could not be identified, or
	 * throws in any case where #isAvailable would be null (namely, not using Windows).
	 * Use #elseNull for a version of this that cannot throw.
	 * @param path The long path name
	 */
	(path: string): string | null;

	/**
	 * Checks if the process is running on a Windows host and
	 * that the library is loaded successfully. Invoking shortName
	 * when this is true will always be safe. When this is false, you
	 * can catch shortName for error details.
	 */
	isAvailable(): boolean;

	/**
	 * Returns the short name for the given long name; or the default
	 * value if the library is not available, or a short name could not be
	 * identified.
	 * @param path The path long name
	 * @param def Default value
	 */
	else<T>(path: string, def: T): string | T;

	/**
	 * Returns the short name for the given long name, or the long name
	 * itself if the call could not be fulfilled for any reason as outlined in #else.
	 * @param path The path long name
	 */
	elseLong(path: string): string;

	/**
	 * Returns the short name for the given long name, or null if the call could not be
	 * fulfilled for any reason as outlined in #else.
	 * @param path The path long name
	 */
	elseNull(path: string): string | null;
}

declare const shortName: WindowsShortName;
export default shortName;
