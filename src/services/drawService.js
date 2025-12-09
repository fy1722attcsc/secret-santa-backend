exports.drawAssignments = (participants) => {
  const givers = [...participants];
  const receivers = [...participants];

  // Shuffle receivers array
  receivers.sort(() => Math.random() - 0.5);

  // Fix any self-assignment
  for (let i = 0; i < givers.length; i++) {
    if (givers[i]._id.toString() === receivers[i]._id.toString()) {
      const swapIndex = (i + 1) % receivers.length;
      [receivers[i], receivers[swapIndex]] = [receivers[swapIndex], receivers[i]];
    }
  }

  // Return pairings
  return givers.map((giver, index) => ({
    giver,
    receiver: receivers[index]
  }));
};
