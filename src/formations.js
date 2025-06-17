
const scaleX = 3;
const scaleZ = 1.8;
const zOffset = 6; // ✅ Move entire formation 20 units closer to our goal


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
};