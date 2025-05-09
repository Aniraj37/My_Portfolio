declare module 'maath/random/dist/maath-random.esm' {
    // Add only what you need, or use `any` for quick use
    export function inSphere(
      array: Float32Array,
      options?: { radius?: number }
    ): [number, number, number][];
  
    // Add more functions as needed from maath/random
  }
  