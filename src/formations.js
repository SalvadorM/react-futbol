
const scaleX = 3;
const scaleZ = 1.8;
const zOffset = 6; // ✅ Move entire formation 20 units closer to our goal

//TODO - find a dynamic way to do this 
// Define player positions for different formations
// Coordinates are X (left/right), Y (up/down - will be 0 for ground), Z (forward/backward)
// Goal will be towards positive Z (our half)
const rawFormation = {
  '4-4-2': [
    // Goal Keeper (1)
    { pos: [0, 0, 13], num: 1 },
    // Defenders (4)
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    // Midfielders (4)
    { pos: [-3.5, 0, 4.5], num: 6 }, { pos: [-1, 0, 4], num: 7 }, { pos: [1, 0, 4], num: 8 }, { pos: [3.5, 0, 4.5], num: 9 },
    // Forwards (2)
    { pos: [-1.5, 0, 0], num: 10 }, { pos: [1.5, 0, 0], num: 11 },
  ],
  '4-3-3': [
    // Goal Keeper (1)
    { pos: [0, 0, 13], num: 1 },
    // Defenders (4)
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    // Midfielders (3)
    { pos: [-2, 0, 4], num: 6 }, { pos: [0, 0, 3.5], num: 7 }, { pos: [2, 0, 4], num: 8 },
    // Forwards (3)
    { pos: [-2.5, 0, -0.5], num: 9 }, { pos: [0, 0, -1.5], num: 10 }, { pos: [2.5, 0, -0.5], num: 11 },
  ],
  '3-5-2': [
    // Goal Keeper (1)
    { pos: [0, 0, 13], num: 1 },
    // Defenders (3)
    { pos: [-3, 0, 9], num: 2 }, { pos: [0, 0, 8.5], num: 3 }, { pos: [3, 0, 9], num: 4 },
    // Midfielders (5)
    { pos: [-4, 0, 4.5], num: 5 }, { pos: [-1.5, 0, 4], num: 6 }, { pos: [0, 0, 3.5], num: 7 }, { pos: [1.5, 0, 4], num: 8 }, { pos: [4, 0, 4.5], num: 9 },
    // Forwards (2)
    { pos: [-1.5, 0, 0], num: 10 }, { pos: [1.5, 0, 0], num: 11 },
  ],
  '5-3-2': [
    // Goal Keeper (1)
    { pos: [0, 0, 13], num: 1 },
    // Defenders (5)
    { pos: [-5, 0, 10], num: 2 }, { pos: [-2.5, 0, 9.5], num: 3 }, { pos: [0, 0, 9], num: 4 }, { pos: [2.5, 0, 9.5], num: 5 }, { pos: [5, 0, 10], num: 6 },
    // Midfielders (3)
    { pos: [-2, 0, 4.5], num: 7 }, { pos: [0, 0, 4], num: 8 }, { pos: [2, 0, 4.5], num: 9 },
    // Forwards (2)
    { pos: [-1.5, 0, 0], num: 10 }, { pos: [1.5, 0, 0], num: 11 },
  ],
  '4-2-3-1': [
    // Goal Keeper (1)
    { pos: [0, 0, 13], num: 1 },
    // Defenders (4)
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    // Defensive Midfielders (2)
    { pos: [-1.5, 0, 6], num: 6 }, { pos: [1.5, 0, 6], num: 7 },
    // Attacking Midfielders (3)
    { pos: [-2.5, 0, 2], num: 8 }, { pos: [0, 0, 1.5], num: 9 }, { pos: [2.5, 0, 2], num: 10 },
    // Striker (1)
    { pos: [0, 0, -1.5], num: 11 },
  ],
  '4-1-4-1': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    { pos: [0, 0, 6.5], num: 6 },
    { pos: [-3, 0, 4], num: 7 }, { pos: [-1, 0, 3.5], num: 8 }, { pos: [1, 0, 3.5], num: 9 }, { pos: [3, 0, 4], num: 10 },
    { pos: [0, 0, 0], num: 11 },
  ],
  '4-3-1-2': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    { pos: [-2, 0, 5], num: 6 }, { pos: [0, 0, 4.5], num: 7 }, { pos: [2, 0, 5], num: 8 },
    { pos: [0, 0, 2.5], num: 9 },
    { pos: [-1.5, 0, 0], num: 10 }, { pos: [1.5, 0, 0], num: 11 },
  ],
  '3-4-3': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-3.5, 0, 9], num: 2 }, { pos: [0, 0, 8.5], num: 3 }, { pos: [3.5, 0, 9], num: 4 },
    { pos: [-4, 0, 6], num: 5 }, { pos: [-1.5, 0, 4.5], num: 6 }, { pos: [1.5, 0, 4.5], num: 7 }, { pos: [4, 0, 6], num: 8 },
    { pos: [-2.5, 0, 1], num: 9 }, { pos: [0, 0, 0], num: 10 }, { pos: [2.5, 0, 1], num: 11 },
  ],
  '4-4-1-1': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    { pos: [-3.5, 0, 5], num: 6 }, { pos: [-1, 0, 4.5], num: 7 }, { pos: [1, 0, 4.5], num: 8 }, { pos: [3.5, 0, 5], num: 9 },
    { pos: [0, 0, 2], num: 10 },
    { pos: [0, 0, 0], num: 11 },
  ],
  '4-2-2-2': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    { pos: [-2, 0, 6], num: 6 }, { pos: [2, 0, 6], num: 7 },
    { pos: [-2, 0, 3.5], num: 8 }, { pos: [2, 0, 3.5], num: 9 },
    { pos: [-1, 0, 0.5], num: 10 }, { pos: [1, 0, 0.5], num: 11 },
  ],
  '3-6-1': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-3.5, 0, 9], num: 2 }, { pos: [0, 0, 8.5], num: 3 }, { pos: [3.5, 0, 9], num: 4 },
    { pos: [-4, 0, 6], num: 5 }, { pos: [-2, 0, 4.5], num: 6 }, { pos: [0, 0, 4], num: 7 }, { pos: [2, 0, 4.5], num: 8 }, { pos: [4, 0, 6], num: 9 }, 
    { pos: [0, 0, 2], num: 10 },
    { pos: [0, 0, 0], num: 11 },
  ],
  '2-3-5': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-3, 0, 9], num: 2 }, { pos: [3, 0, 9], num: 3 },
    { pos: [-4, 0, 6], num: 4 }, { pos: [0, 0, 5.5], num: 5 }, { pos: [4, 0, 6], num: 6 },
    { pos: [-3, 0, 3.5], num: 7 }, { pos: [-1.5, 0, 2.5], num: 8 }, { pos: [0, 0, 2], num: 9 }, { pos: [1.5, 0, 2.5], num: 10 }, { pos: [3, 0, 3.5], num: 11 },
  ],
  '4-3-2-1': [
    { pos: [0, 0, 13], num: 1 },
    { pos: [-4, 0, 9], num: 2 }, { pos: [-1.5, 0, 8.5], num: 3 }, { pos: [1.5, 0, 8.5], num: 4 }, { pos: [4, 0, 9], num: 5 },
    { pos: [-2.5, 0, 6], num: 6 }, { pos: [0, 0, 5.5], num: 7 }, { pos: [2.5, 0, 6], num: 8 },
    { pos: [-1.5, 0, 3], num: 9 }, { pos: [1.5, 0, 3], num: 10 },
    { pos: [0, 0, 0.5], num: 11 },
  ]

}
function transformFormation(formation) {
  return formation.map(({ pos, num }) => ({
    pos: [
      pos[0] * scaleX,
      pos[1],
      pos[2] * scaleZ + zOffset, // ✅ Add offset here
    ],
    num,
  }));
}
export const formationPositions = {
  '4-4-2': transformFormation(rawFormation['4-4-2']),
  '4-3-3': transformFormation(rawFormation['4-3-3']),
  '3-5-2': transformFormation(rawFormation['3-5-2']),
  '5-3-2': transformFormation(rawFormation['5-3-2']),
  '4-2-3-1': transformFormation(rawFormation['4-2-3-1']),
  '4-1-4-1': transformFormation(rawFormation['4-1-4-1']),
  '4-3-1-2': transformFormation(rawFormation['4-3-1-2']),
  '3-4-3': transformFormation(rawFormation['3-4-3']),
  '4-4-1-1': transformFormation(rawFormation['4-4-1-1']),
  '4-2-2-2': transformFormation(rawFormation['4-2-2-2']),
  '3-6-1': transformFormation(rawFormation['3-6-1']),
  '2-3-5' : transformFormation(rawFormation['2-3-5']),
  '4-3-2-1' : transformFormation(rawFormation['4-3-2-1']),
};