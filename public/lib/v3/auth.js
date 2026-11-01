export const auth = {
  currentUser: {
    email: 'editor@gmail.com',
    getIdToken: async () => 'mock_id_token_12345'
  }
};

export function onAuth(callback) {
  // Immediately call callback with mock user so activation page works instantly
  callback({
    email: 'editor@gmail.com',
    getIdToken: async () => 'mock_id_token_12345'
  });
}
