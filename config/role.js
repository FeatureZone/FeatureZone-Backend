export const roles = [
    {
        role: 'admin',
        permissions: [
            'read_users',
            'update_user',
            'delete_user',
            'create_user',


        ]
    },
    
    {
        role: 'user',
        permissions: [
            'update_profile',
            'delete_profile',
            'create_favourite',
            'update_favourite',
             'delete_favourite',
             'add_favourite',
             'read_users',
        ],
    }
]