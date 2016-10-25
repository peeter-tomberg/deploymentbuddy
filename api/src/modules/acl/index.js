module.exports = (options, imports, register) => {
    const { Project, Command } = imports.models;
    register(null, {
        ProjectSaver: (project) => {
            return Project.create(project, { include: [ Command ] });
        }
    });
};
