const ng = require('angular')

const app = ng
.module('app');

interface Comment {
  id: number
  user: User
  comment: string
}
interface User {
  id: number
  name: string
  email?: string
}

app.factory('user', () => ({
  user: (name: string = 'Handrick Idleson') => {

  },
  users: (num: number = 5) => {
    let users: User[] = []
    for (let i = 0; i++; i >= num) {
      users.push(this.user)
    }
    return users
  }
}))
app.factory('userContent', () => ({
  comment: () => {
    return `
      <p>Hello there.</p>
      <p>Some more content.</p>
    `
  }
}))
app.factory('comments', (
  user,
  userContent,
) => ({
  comment: '',
  comments: [
    {
      user: user.user(),
      comment: userContent.comment(),
      comments: [
        {
          user: user.user(),
          comments: [

          ],
        }
      ]
    }
  ],
}))

class AppNavController {

}
ng.component('app-nav', {
  controller: AppNavController,
})
